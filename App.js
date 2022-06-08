import { ActivityIndicator, FlatList, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=5"
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <>
              <Text>{item.title}</Text>
              <Image
                style={{ width: 150, height: 150 }}
                source={{
                  uri: item.url,
                }}
              />
            </>
          )}
        />
      )}
    </View>
  );
}
