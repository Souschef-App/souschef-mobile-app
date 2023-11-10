import React from "react";
import { HStack, Skeleton, VStack } from "../../../../components";
import { ThemeContext } from "../../../../contexts/AppContext";

const TaskSkeleton = () => {
  // Theme
  const theme = React.useContext(ThemeContext);

  return (
    <VStack gap={theme.spacing.xl} p={theme.spacing.m}>
      <VStack
        justifyContent="flex-end"
        gap={theme.spacing.xl}
        style={{ flex: 1 }}
      >
        <VStack flexMain={false} gap={theme.spacing.m}>
          <Skeleton height={64} />
          <HStack
            flexMain={false}
            gap={theme.spacing.l}
            style={{ height: theme.spacing.l }}
          >
            <Skeleton width={100} />
            <HStack flexMain={false} gap={theme.spacing.s}>
              <Skeleton width={100} />
            </HStack>
          </HStack>
        </VStack>
        <Skeleton height={48} />
      </VStack>
      <VStack style={{ flex: 1 }}>
        <VStack
          justifyContent="flex-start"
          pVH={{ h: theme.spacing.m }}
          gap={theme.spacing.l}
        >
          <Skeleton />
          <Skeleton />
        </VStack>
        <Skeleton height={56} style={{ borderRadius: 64 }} />
      </VStack>
    </VStack>
  );
};

export default TaskSkeleton;
