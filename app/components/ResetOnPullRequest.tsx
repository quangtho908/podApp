// ResetOnPullToRefresh.tsx
import React, { useState } from 'react';
import { ScrollView, RefreshControl, Text, View, Button } from 'react-native';

const ResetOnPullToRefresh = () => {
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
    >
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text>{content}</Text>
      </View>
    </ScrollView>
  );
};

export default ResetOnPullToRefresh;
