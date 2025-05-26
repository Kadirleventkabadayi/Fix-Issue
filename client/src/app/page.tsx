"use client";

import { Container, Typography, Box } from "@mui/material";
import { useAtom } from "jotai";
import { filteredItemsAtom } from "@/store/items";
import Layout from "@/components/Layout/Layout";
import AuthGuard from "@/components/Auth/AuthGuard";
import FilterSort from "@/components/ItemList/FilterSort";
import ItemCard from "@/components/ItemList/ItemCard";

export default function HomePage() {
  const [items] = useAtom(filteredItemsAtom);

  return (
    <AuthGuard>
      <Layout>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            Popular Projects
          </Typography>

          <FilterSort />

          <Box>
            {items.length > 0 ? (
              items.map((item) => <ItemCard key={item.id} item={item} />)
            ) : (
              <Typography variant="body1" color="text.secondary">
                No items found matching your filters.
              </Typography>
            )}
          </Box>
        </Container>
      </Layout>
    </AuthGuard>
  );
}
