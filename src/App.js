import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  Grid,
  Typography,
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Paper,
} from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D0ED57"];

const mockData = [
  {
    name: "Product A",
    likes: 100,
    shares: 50,
    comments: 30,
    followers: 15000,
    category: "Tech",
    location: "USA",
  },
  {
    name: "Product B",
    likes: 200,
    shares: 100,
    comments: 60,
    followers: 20000,
    category: "Fashion",
    location: "UK",
  },
  {
    name: "Product C",
    likes: 300,
    shares: 150,
    comments: 90,
    followers: 25000,
    category: "Sports",
    location: "Canada",
  },
  {
    name: "Product D",
    likes: 400,
    shares: 200,
    comments: 120,
    followers: 30000,
    category: "Tech",
    location: "Germany",
  },
  {
    name: "Product E",
    likes: 500,
    shares: 250,
    comments: 150,
    followers: 35000,
    category: "Fashion",
    location: "France",
  },
  {
    name: "Product F",
    likes: 300,
    shares: 150,
    comments: 90,
    followers: 2500,
    category: "Sports",
    location: "Canada",
  },
  {
    name: "Product G",
    likes: 400,
    shares: 200,
    comments: 120,
    followers: 30,
    category: "Tech",
    location: "Germany",
  },
  {
    name: "Product H",
    likes: 500,
    shares: 250,
    comments: 150,
    followers: 3000,
    category: "Fashion",
    location: "France",
  },
];

const Dashboard = () => {
  const [items, setItems] = useState(mockData);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [engagementScoreFilter, setEngagementScoreFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [modalItem, setModalItem] = useState(null);
  const [open, setOpen] = useState(false);

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    if (category === "") {
      setItems([...mockData]);
      return;
    }
    const filteredItems = mockData.filter((item) => item.category === category);
    setItems(filteredItems);
  };

  const handleEngagementScoreFilter = (scoreRange) => {
    setEngagementScoreFilter(scoreRange);
    if (scoreRange === "") {
      setItems([...mockData]);
      return;
    }
    const scoreRangeValues = scoreRange.split("-");
    const minScore = parseInt(scoreRangeValues[0]);
    const maxScore = parseInt(scoreRangeValues[1]);
    const filteredItems = mockData.filter((item) => {
      const engagementScore = item.likes + item.shares + item.comments;
      return engagementScore >= minScore && engagementScore <= maxScore;
    });
    setItems(filteredItems);
  };

  const handleSort = (option) => {
    console.log("handleSort", option);
    setSortOption(option);
    if (option === "") {
      setItems([...mockData]);
      return;
    }
    if (option === "engagementScore-asc") {
      const sortedItems = items.sort((a, b) => {
        const engagementScoreA = a.likes + a.shares + a.comments;
        const engagementScoreB = b.likes + b.shares + b.comments;
        return engagementScoreA - engagementScoreB;
      });
      setItems(sortedItems);
    } else if (option === "engagementScore-desc") {
      const sortedItems = items.sort((a, b) => {
        const engagementScoreA = a.likes + a.shares + a.comments;
        const engagementScoreB = b.likes + b.shares + b.comments;
        return engagementScoreB - engagementScoreA;
      });
      setItems(sortedItems);
    } else if (option === "reach-asc") {
      const sortedItems = items.sort((a, b) => {
        const reachA = (a.followers * (a.likes + a.shares + a.comments)) / 100;
        const reachB = (b.followers * (b.likes + b.shares + b.comments)) / 100;
        return reachA - reachB;
      });
      setItems(sortedItems);
    } else if (option === "reach-desc") {
      const sortedItems = items.sort((a, b) => {
        const reachA = (a.followers * (a.likes + a.shares + a.comments)) / 100;
        const reachB = (b.followers * (b.likes + b.shares + b.comments)) / 100;
        return reachB - reachA;
      });
      setItems(sortedItems);
    }
  };

  const handleViewDetails = (item) => {
    setModalItem(item);
    setOpen(true);
  };

  const engagementHistoryData = [
    { name: "Likes", value: modalItem && modalItem.likes },
    { name: "Shares", value: modalItem && modalItem.shares },
    { name: "Comments", value: modalItem && modalItem.comments },
  ];

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12px"
        fontFamily="'Sora', sans-serif"
      >
        {`${engagementHistoryData[index].value}`}
      </text>
    );
  };

  return (
    <Box sx={{ padding: 2, fontFamily: `'Sora', sans-serif` }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl
            variant="outlined"
            sx={{ width: "100%", fontFamily: `'Sora', sans-serif` }}
          >
            <InputLabel id="category-filter-label">Category Filter</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              label="Category Filter"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Fashion">Fashion</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl
            variant="outlined"
            sx={{ width: "100%", fontFamily: `'Sora', sans-serif` }}
          >
            <InputLabel id="engagement-score-filter-label">
              Engagement Score Filter
            </InputLabel>
            <Select
              labelId="engagement-score-filter-label"
              id="engagement-score-filter"
              value={engagementScoreFilter}
              onChange={(e) => handleEngagementScoreFilter(e.target.value)}
              label="Engagement Score Filter"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="0-1000">0-1000</MenuItem>
              <MenuItem value="1000-5000">1000-5000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl
            variant="outlined"
            sx={{ width: "100%", fontFamily: `'Sora', sans-serif` }}
          >
            <InputLabel id="sort-label">Sort</InputLabel>
            <Select
              labelId="sort-label"
              id="sort"
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              label="Sort"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="engagementScore-asc">
                Engagement Score (ASC)
              </MenuItem>
              <MenuItem value="engagementScore-desc">
                Engagement Score (DESC)
              </MenuItem>
              <MenuItem value="reach-asc">Reach (ASC)</MenuItem>
              <MenuItem value="reach-desc">Reach (DESC)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={2} mt={2}>
        {items.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.name}
            sx={{
              boxShadow: "none",
            }}
            mb={4}
          >
            <Paper
              sx={{
                height: "100%",
                fontFamily: `'Sora', sans-serif`,
                border: "1px solid #ebeaee",
                borderRadius: "10px",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ebeaee",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: `'Sora', sans-serif`,
                  color: "#16133c",
                  marginBottom: 2,
                }}
              >
                {item.name}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "150px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "15px",
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: "#999",
                  fontFamily: `'Sora', sans-serif`,
                }}
              >
                <img
                  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  alt="Placeholder"
                  width="100%"
                  height="150px"
                />
              </Box>
              <Box
                sx={{
                  borderTop: "1px solid #ebeaee",
                  paddingTop: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              ></Box>
              <Box
                sx={{
                  borderTop: "2px solid #ebeaee",
                  paddingTop: 2,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: 14,
                    color: "textSecondary",
                    fontFamily: `'Sora', sans-serif`,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 0.5,
                      fontFamily: `'Sora', sans-serif`,
                    }}
                  >
                    Engagement Score
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: `'Sora', sans-serif`,
                    }}
                  >
                    {item.likes + item.shares + item.comments}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: 14,
                    color: "textSecondary",
                    fontFamily: `'Sora', sans-serif`,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 0.5,
                      fontFamily: `'Sora', sans-serif`,
                    }}
                  >
                    Reach
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: `'Sora', sans-serif`,
                    }}
                  >
                    {(
                      (item.followers *
                        (item.likes + item.shares + item.comments)) /
                      100
                    ).toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: 14,
                    color: "textSecondary",
                    fontFamily: `'Sora', sans-serif`,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 0.5,
                      fontFamily: `'Sora', sans-serif`,
                    }}
                  >
                    Category
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: `'Sora', sans-serif`,
                    }}
                  >
                    {item.category}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: 14,
                    color: "textSecondary",
                    fontFamily: `'Sora', sans-serif`,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 0.5,
                      fontFamily: `'Sora', sans-serif`,
                    }}
                  >
                    Location
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: `'Sora', sans-serif`,
                    }}
                  >
                    {item.location}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: "auto", // Pushes button to the bottom
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewDetails(item)}
                  sx={{
                    fontFamily: `'Sora', sans-serif`,
                  }}
                >
                  View Details
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: `'Sora', sans-serif`,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 3,
            border: "1px solid #ebeaee",
            borderRadius: 3,
            maxWidth: 500,
            width: "90%",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Modal Header */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: `'Sora', sans-serif`,
              fontWeight: "bold",
              marginBottom: 2,
              color: "#16133c",
            }}
          >
            {modalItem && modalItem.name}
          </Typography>

          {/* Modal Content */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: `'Sora', sans-serif`,
                marginBottom: 1,
                color: "#666",
              }}
            >
              Category: {modalItem && modalItem.category}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: `'Sora', sans-serif`,
                marginBottom: 1,
                color: "#666",
              }}
            >
              Location: {modalItem && modalItem.location}
            </Typography>
          </Box>

          {/* Pie Chart */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <PieChart width={300} height={200}>
              <Pie
                data={engagementHistoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={renderCustomLabel}
                labelLine={false}
              >
                {engagementHistoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>

          {/* Close Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(false)}
              sx={{
                fontFamily: `'Sora', sans-serif`,
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
