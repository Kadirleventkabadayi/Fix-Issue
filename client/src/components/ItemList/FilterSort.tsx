"use client";

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { useAtom } from "jotai";
import {
  searchAtom,
  sortByAtom,
  selectedLabelsAtom,
  allLabelsAtom,
} from "@/store/items";

export default function FilterSort() {
  const [search, setSearch] = useAtom(searchAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [selectedLabels, setSelectedLabels] = useAtom(selectedLabelsAtom);
  const [allLabels] = useAtom(allLabelsAtom);

  return (
    <Box sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        label="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          >
            <MenuItem value="stars">Stars</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="recent">Recent</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel>Filter by labels</InputLabel>
          <Select
            multiple
            value={selectedLabels}
            onChange={(e) => {
              const value =
                typeof e.target.value === "string"
                  ? e.target.value.split(",")
                  : e.target.value;
              setSelectedLabels(value);
            }}
            input={<OutlinedInput label="Filter by labels" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {allLabels.map((label) => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
