import React, { useState } from 'react';
import { useClient } from 'sanity';
import Papa from 'papaparse';
import { Card, Text, Stack, Button, Flex, Box, Badge, Code, Spinner } from '@sanity/ui';

export function BulkImportTool() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] }>({
    success: 0,
    failed: 0,
    errors: [],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  };

  const handleImport = () => {
    if (!file) return;
    setLoading(true);
    setResults({ success: 0, failed: 0, errors: [] });

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const rows = result.data as any[];
        let successCount = 0;
        let failedCount = 0;
        const errorsList: string[] = [];

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          try {
            // Mapping CSV fields to Sanity schema
            const doc = {
              _type: 'product',
              name: row.name || row.Name || 'Unnamed Product',
              slug: {
                _type: 'slug',
                current: generateSlug(row.slug || row.name || row.Name || `product-${Date.now()}-${i}`),
              },
              category: row.category || row.Category || 'livestock', // Default fallback
              subcategory: row.subcategory || row.Subcategory || 'freshwater-fish', // Default fallback
              price: Number(row.price || row.Price || 0),
              priceLabel: row.priceLabel || row.PriceLabel || '',
              description: row.description || row.Description || '',
              inStock: String(row.inStock || row.InStock).toLowerCase() !== 'false',
              availability: row.availability || row.Availability || 'In Store',
              featured: String(row.featured || row.Featured).toLowerCase() === 'true',
            };

            await client.create(doc);
            successCount++;
          } catch (err: any) {
            failedCount++;
            errorsList.push(`Row ${i + 1} (${row.name || 'Unnamed'}): ${err.message}`);
          }
        }

        setResults({ success: successCount, failed: failedCount, errors: errorsList });
        setLoading(false);
      },
      error: (error) => {
        setResults((prev) => ({ ...prev, errors: [...prev.errors, `CSV Parse Error: ${error.message}`] }));
        setLoading(false);
      },
    });
  };

  return (
    <Card padding={4} radius={2} shadow={1} margin={4}>
      <Stack space={4}>
        <Text size={3} weight="bold">📦 Bulk Import Products</Text>
        <Text size={1} muted>
          Upload a CSV file to automatically create products. Ensure your CSV has headers that match the schema fields:
        </Text>
        
        <Box padding={3} style={{ backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}>
          <Code size={1}>name, category, subcategory, price, priceLabel, description, inStock, availability, featured</Code>
        </Box>

        <Text size={1}>
          <strong>Category values:</strong> special-offers, livestock, tanks, equipment, maintenance<br />
          <strong>Subcategory values:</strong> freshwater-fish, marine-fish, shrimp-inverts, live-plants, combo-deals, starter-kits, filtration, fish-food, etc.
        </Text>

        <Flex gap={3} align="center">
          <input type="file" accept=".csv" onChange={handleFileChange} disabled={loading} />
          <Button 
            fontSize={2} 
            padding={3} 
            tone="primary" 
            text={loading ? 'Importing...' : 'Start Import'} 
            onClick={handleImport} 
            disabled={!file || loading} 
          />
          {loading && <Spinner />}
        </Flex>

        {results.success > 0 || results.failed > 0 ? (
          <Box padding={4} marginTop={4} style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}>
            <Stack space={3}>
              <Text weight="bold">Import Results</Text>
              <Flex gap={2}>
                <Badge tone="positive">Success: {results.success}</Badge>
                {results.failed > 0 && <Badge tone="critical">Failed: {results.failed}</Badge>}
              </Flex>
              {results.errors.length > 0 && (
                <Box marginTop={3}>
                  <Text size={1} weight="semibold" style={{ color: 'red' }}>Errors:</Text>
                  <ul style={{ fontSize: '13px', color: 'red', paddingLeft: '20px' }}>
                    {results.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </Box>
              )}
            </Stack>
          </Box>
        ) : null}
      </Stack>
    </Card>
  );
}
