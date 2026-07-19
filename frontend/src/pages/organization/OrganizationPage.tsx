import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationTree from "../../components/OrganizationTree";

import { getOrganizationTree } from "../../services/employeeService";

interface TreeNode {
  _id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  role: string;
  children: TreeNode[];
}

const OrganizationPage = () => {
  const [loading, setLoading] = useState(true);

  const [tree, setTree] = useState<TreeNode[]>([]);

  useEffect(() => {
    loadTree();
  }, []);

  const loadTree = async () => {
    try {
      const { data } = await getOrganizationTree();

      setTree(data.tree);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          mt={10}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Organization Hierarchy
      </Typography>

      {tree.map((node) => (
        <OrganizationTree
          key={node._id}
          node={node}
        />
      ))}

    </DashboardLayout>
  );
};

export default OrganizationPage;