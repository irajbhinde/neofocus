import { wallpaperList } from "../assets/BackgroundImages/wallpaper";

const getRandomWallpaper = Math.floor(Math.random(0, wallpaperList.images.length) * 10);

export { getRandomWallpaper };
