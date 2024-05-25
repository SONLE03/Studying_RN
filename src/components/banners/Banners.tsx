import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Banner } from '../../types';
import { colors } from '../../theme';

interface Props {
  banners: Banner[];
}

const Banners: React.FC<Props> = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<Carousel<Banner>>(null); // Sửa ở đây để chỉ định kiểu cho carouselRef

  const width = Dimensions.get('screen').width;

  const renderItem = ({ item }: { item: Banner }) => {
    return (
      <View>
        <Image source={{ uri: item.imageURL }} style={styles.bannerImg} />
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={banners.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          marginTop: -50,
        }}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
        carouselRef={carouselRef} // Sửa ở đây để truyền carouselRef mà không cần .current
      />
    );
  };

  return (
    <View>
      <Carousel
        data={banners}
        ref={carouselRef} // Sửa ở đây để truyền carouselRef mà không cần .current
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      {pagination()}
    </View>
  );
};

export default Banners;

const styles = StyleSheet.create({
  bannerImg: {
    width: '100%',
    height: 200,
  },
  box: {
    backgroundColor: colors.lightGray,
    height: 200,
  },
});
