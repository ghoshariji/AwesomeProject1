import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

const videos = [
  {
    title: 'Video 1',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 2',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 3',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 4',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 5',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 6',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 7',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 8',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 9',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 10',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 11',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
  {
    title: 'Video 12',
    thumbnail: require('../assets/baa.jpg'),
    url: 'https://www.youtube.com/watch?v=Ly1L_sSwvlo&list=RDLy1L_sSwvlo&start_radio=1&ab_channel=MohammadNazmulHaque',
  },
];

const Resource = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase().replace(/\s+/g, '');
    setFilteredVideos(
      videos.filter(video =>
        video.title
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(normalizedSearchQuery),
      ),
    );
  }, [searchQuery]);

  useEffect(() => {
    if (imagesLoaded === videos.length) {
      setLoading(false);
    }
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded(imagesLoaded + 1);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container1}>
      <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search Classes here ..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholderTextColor="black"
      />
    </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <ScrollView contentContainerStyle={styles.container}>
        {filteredVideos.map((video, index) => (
          <View key={index} style={styles.videoContainer}>
            <TouchableOpacity onPress={() => Linking.openURL(video.url)}>
              <Image
                source={video.thumbnail}
                style={styles.thumbnail}
                onLoad={handleImageLoad}
              />
              <Text style={styles.title}>{video.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const {width} = Dimensions.get('window');
const videoWidth = width / 2 - 30; // Adjust width to fit two videos per row

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: 'black',
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "black",
    fontSize: 16,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  videoContainer: {
    width: videoWidth,
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
  },
  thumbnail: {
    width: videoWidth,
    height: videoWidth * 0.56, // 16:9 aspect ratio
    marginBottom: 10,
  },
});

export default Resource;
