import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

interface TreeNode {
  _id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  role: string;
  children: TreeNode[];
}

interface Props {
  node: TreeNode;
}

const OrganizationTree = ({
  node,
}: Props) => {
  return (
    <Box
      ml={4}
      mt={2}
    >
      <Card
        sx={{
          width: 320,
        }}
      >
        <CardContent>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Avatar>
              {node.name.charAt(0)}
            </Avatar>

            <Box>

              <Typography
                fontWeight={700}
              >
                {node.name}
              </Typography>

              <Typography
                variant="body2"
              >
                {node.designation}
              </Typography>

              <Typography
                variant="caption"
              >
                {node.department}
              </Typography>

              <Typography
                variant="caption"
                display="block"
              >
                {node.role}
              </Typography>

            </Box>

          </Stack>

        </CardContent>
      </Card>

      {node.children?.length > 0 && (
        <Box
          ml={6}
          mt={1}
          borderLeft="2px solid #ddd"
          pl={2}
        >
          {node.children.map((child) => (
            <OrganizationTree
              key={child._id}
              node={child}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OrganizationTree;