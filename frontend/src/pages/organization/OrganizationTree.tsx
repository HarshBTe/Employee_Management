import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Node {
  _id: string;
  name: string;
  designation: string;
  department: string;
  children: Node[];
}

interface Props {
  node: Node;
}

const OrganizationTree = ({ node }: Props) => {
  return (
    <Box ml={4} mt={2}>
      <Paper
        sx={{
          p: 2,
          display: "inline-block",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Avatar>
            {node.name[0]}
          </Avatar>

          <Box>
            <Typography fontWeight={600}>
              {node.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {node.designation}
            </Typography>

            <Typography
              variant="caption"
            >
              {node.department}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {node.children?.map((child) => (
        <OrganizationTree
          key={child._id}
          node={child}
        />
      ))}
    </Box>
  );
};

export default OrganizationTree;