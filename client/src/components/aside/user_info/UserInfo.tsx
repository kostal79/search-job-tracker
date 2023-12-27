import React, {  RefObject, useRef } from "react";
import { useAppSelector } from "store/hooks";
import defaultAvatar from "assets/default_avatar.png";
import ButtonSettings from "../../ButtonSettings";

export default function UserInfo(): React.ReactNode {
  const user = useAppSelector((state) => state.auth.user);
  const userLogo = user.userLogo;
  const imageRef = useRef<HTMLImageElement>(null);

  const loadDefaultImg: (
    imageRef: RefObject<HTMLImageElement>,
    imageSrc: string
  ) => void = (imageRef, imageSrc) => {
    if (imageRef.current) {
      imageRef.current.src = imageSrc;
    }
  };

  const imageLoadErrorHandler = () => {
    return loadDefaultImg(imageRef, defaultAvatar)
  }

  return (
    <section className="flex justify-between items-center">
      <div className="flex gap-2.5 items-center">
        <img
          id="user"
          className=" w-10 h-10 rounded-full"
          src={userLogo!}
          alt=""
          ref={imageRef}
          onError={imageLoadErrorHandler}
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs text-grey-mid font-light">Welcome back,</p>
          <p className="text-lg text-grey-dark font-medium">{user.userName}</p>
        </div>
      </div>
      <ButtonSettings />
    </section>
  );
}
