"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { Star, Add, Check } from "@mui/icons-material";
import { Item } from "@/types/item";
import { useAtom } from "jotai";
import { itemsAtom } from "@/store/items";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const [items, setItems] = useAtom(itemsAtom);

  const handleAddItem = () => {
    setItems(
      items.map((i) => (i.id === item.id ? { ...i, added: !i.added } : i))
    );
  };

  const formatStarCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={1}
        >
          <Typography variant="h6" component="h2">
            {item.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Star sx={{ color: "#ffd700", fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              {formatStarCount(item.starCount)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {item.description}
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {item.labels.map((label) => (
            <Chip key={label} label={label} size="small" variant="outlined" />
          ))}
        </Box>

        <Button
          variant={item.added ? "outlined" : "contained"}
          startIcon={item.added ? <Check /> : <Add />}
          onClick={handleAddItem}
          color={item.added ? "success" : "primary"}
        >
          {item.added ? "Added" : "Add"}
        </Button>
      </CardContent>
    </Card>
  );
}
