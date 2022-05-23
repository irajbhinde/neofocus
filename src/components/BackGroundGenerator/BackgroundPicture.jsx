import "./background.css";
import { wallpaperList } from "../../assets/BackgroundImages/wallpaper";
import { getRandomWallpaper } from "../../utils/getRandomWallpaper";

export default function BackroundImage() {
  const wallpaper = wallpaperList.images[getRandomWallpaper].image;
  return (
    <div>
      <img src={wallpaper} alt="error" />
    </div>
  );
}
