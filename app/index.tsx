import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CardMovies from '~/components/CardMovies';
import { api } from '~/services/api';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [moviesFilter, setMoviesFilter] = useState<Movie[]>([]);

  const moviesData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/movie/popular', {
        params: {
          page,
        },
      });
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query: string) => {
    setLoading(true);
    try {
      const response = await api.get('/search/movie', {
        params: {
          query,
        },
      });

      if (response.data.results.length === 0) {
        Alert.alert('Nenhum resultado encontrado');
      } else {
        setMoviesFilter(response.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const identifySearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      searchMovies(text);
    } else {
      setMoviesFilter([]);
    }
  };

  const movieData = search.length > 2 ? moviesFilter : movies;

  useEffect(() => {
    moviesData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FulltureFlix</Text>
        <View style={styles.containerInput}>
          <TextInput
            placeholderTextColor="#fff"
            placeholder="Buscar"
            style={styles.input}
            value={search}
            onChangeText={identifySearch}
          />
          <MaterialCommunityIcons name="movie-search" color="#fff" size={24} />
        </View>
      </View>
      <View>
        <FlatList
          data={movieData}
          numColumns={3}
          renderItem={({ item }) => <CardMovies data={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 30,
            paddingBottom: 100,
          }}
          onEndReached={() => moviesData()}
          onEndReachedThreshold={0.5}
        />
        {loading && <ActivityIndicator size="large" color="blue" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3F47',
  },
  header: {
    padding: 25,
  },
  headerText: {
    marginTop: 30,
    fontSize: 24,
    lineHeight: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerInput: {
    backgroundColor: '#67686D',
    height: 42,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  input: {
    marginLeft: 10,
    color: '#fff',
    paddingLeft: 10,
    width: 250,
  },
});
