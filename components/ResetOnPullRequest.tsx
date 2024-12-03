// ResetOnPullToRefresh.tsx
import React, { Children, useState } from 'react';
import { ScrollView, RefreshControl, Text, View, Button, ViewProps, ScrollViewProps } from 'react-native';

const ResetOnPullToRefresh = (
  props: ScrollViewProps
) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [content, setContent] = useState('This is some content.');

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setContent('This is the reset content.');
      setIsRefreshing(false);
    }, 2000); // Thực hiện reset sau 2 giây
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
