// ResetOnPullToRefresh.tsx
import React, { Children, useState } from 'react';
import { ScrollView, RefreshControl, Text, View, Button, ViewProps, ScrollViewProps } from 'react-native';

const ResetOnPullToRefresh = (
  props: ScrollViewProps & {reload?: () => void}
) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    if(props.reload != undefined) {
      await props.reload();
    }
    setIsRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      {...props}
    >
      {props.children}
    </ScrollView>
  );
};

export default ResetOnPullToRefresh;
