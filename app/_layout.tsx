import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      console.log('\n(1) \n \tApp is ready. This is logging for that ');
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleSpotifyFetch = () => {
    fetch("https://api.spotify.com/v1/deprecated-endpoint")
      .then((response) => {
        if (!response.ok) {
          console.warn("API for Spotify is deprecated, use Deezer instead");
        }
      })
      .catch(() => {
        console.warn("API for Spotify is deprecated, use Deezer instead");
      });
  };

  const handleDeezerFetch = () => {
    console.log("Starting Deezer API call...");

    fetch("https://api.deezer.com/user/2529")
      .then(() => {
        console.log("Deezer API call completed.");

        setTimeout(() => {
          console.info("Data successfully fetched");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error during Deezer API call:", error);
      });
  };

  const handleFetchMore = () => {
    try {
      throw new Error("Simulated fetch error");
    } catch (error) {
      console.error("Failed to fetch more data from Deezer:", error);
    }
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <Button title="Fetch from Spotify" onPress={handleSpotifyFetch} />
        <Button title="Fetch from Deezer" onPress={handleDeezerFetch} />
        <Button title="Fetch More from Deezer" onPress={handleFetchMore} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
    gap: 8,
  },
});