import React, { useEffect, useState } from 'react';
import { Text, Pressable, Image, View, StyleSheet } from 'react-native';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface Props {
  data: Movie;
  onPress?: () => void;
}

export default function CardMovies({ data, ...rest }: Props) {
  const [titleStyle, setTitleStyle] = useState(styles.title);

  useEffect(() => {
    if (data.title.length < 10) {
      setTitleStyle({ ...styles.title, marginTop: 20 });
    }
  }, [data.title]);

  return (
    <Pressable {...rest} style={styles.cardMovie}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        }}
        style={styles.cardImage}
      />
      <Text style={titleStyle}>{data.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardMovie: {
    width: 120,
    height: 210,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#424249',
  },
  cardImage: {
    width: 120,
    height: 160,
    borderRadius: 15,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
