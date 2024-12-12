import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useModalContext } from "../../context/ModalContext";

import { getMyProfile, editMyProfile, editMyImage } from "../../api/profile";

import { BASE_URL } from "../../shared/utils/fetchClient";
import { ProfilePageMessages } from "../../shared/utils/modalMessages";

import { Profile } from "../../types/Profile";

import { UploadAvatar } from "../../components/upload-avatar";
import { ChangePassword } from "../../components/change-password/ChangePassword";

import "./ProfilePage.scss";
import { ProfileSkeleton } from "../../components/profile-skeleton";

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [initialProfile, setInitialProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  const [src, setSrc] = useState<string | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [refreshProfile, setRefreshProfile] = useState<boolean>(false);

  const { showModal } = useModalContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;

    const { name, value } = e.target;
    const updatedProfile = {
      ...profile,
      ...(name === "username" || name === "email"
        ? { user: { ...profile.user, [name]: value } }
        : { [name]: value }),
    };

    setProfile(updatedProfile);
    setIsChanged(
      JSON.stringify(updatedProfile) !== JSON.stringify(initialProfile)
    );
  };

  const handleSave = async () => {
    if (!profile) return;

    const { id } = profile;

    if (isChanged) {
      try {
        await editMyProfile(profile, id);

        showModal(ProfilePageMessages.PROFILE_UPDATE_SUCCESS);

        setInitialProfile(profile);
        setRefreshProfile((prev) => !prev);
      } catch (error) {
        showModal(ProfilePageMessages.PROFILE_UPDATE_ERROR);
        setProfile(initialProfile);
      } finally {
        setIsChanged(false);
      }
    }

    if (isImageChanged) {
      try {
        await editMyImage({ image: preview }, profile.id);
        setIsImageChanged(false);
        setRefreshProfile((prev) => !prev);
      } catch (error) {
        showModal(ProfilePageMessages.PROFILE_IMAGE_ERROR);
      }
    }
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setSrc(imageUrl || "");
    setPreview(imageUrl || "");
    setIsChanged(false);
    setIsImageChanged(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      try {
        const data = await getMyProfile();

        setImageUrl(
          data?.image?.id ? `${BASE_URL}/images/${data?.image?.id}` : null
        );
        setProfile(data);
        setInitialProfile(data);
      } catch (error) {
        showModal(ProfilePageMessages.PROFILE_LOAD_ERROR);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [refreshProfile]);

  if (!profile) {
    return <ProfileSkeleton />;
  }

  console.log(loading);

  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__body">
          <div className="profile__top">
            <h1 className="profile__title title-3">
              {t("pages.profile.title")}
            </h1>
            <div className="profile__buttons">
              <div className="button-wrapper">
                <button
                  className={`profile__button button button_sm button_default ${!isChanged && !isImageChanged ? "_disabled" : ""
                    }`}
                  onClick={handleSave}
                  disabled={!isChanged && !isImageChanged}
                >
                  <span>{t("pages.profile.save")}</span>
                </button>
              </div>
              <div className="button-wrapper">
                <button
                  className={`profile__button button button_sm button_reverse ${!isChanged && !isImageChanged ? "_disabled" : ""
                    }`}
                  onClick={handleCancel}
                >
                  <span>{t("pages.profile.cancel")}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="profile__items">
            <div className="profile__item">
              <h2 className="profile__subtitle title-3">
                {t("pages.profile.info")}
              </h2>
              <div className="profile__content">
                <div className="profile__info">
                  <UploadAvatar
                    profile={profile}
                    setIsImageChanged={(value: boolean) =>
                      setIsImageChanged(value)
                    }
                    src={src}
                    preview={preview}
                    setSrc={(value: string | undefined) => setSrc(value)}
                    setPreview={(value: string | undefined) =>
                      setPreview(value)
                    }
                    imageUrl={imageUrl}
                  />
                  <div className="profile__block">
                    <p className="profile__username">
                      {profile?.user?.username} {profile?.user?.role?.name}
                    </p>
                    <p className="profile__id text-muted">ID: {profile?.id}</p>
                    <ChangePassword />
                  </div>
                </div>
                <div className="profile__inputs">
                  <div className="profile__group">
                    <label htmlFor="name" className="profile__label">
                      {t("pages.profile.namev")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder={t("pages.profile.name")}
                      className="form__input input"
                      value={profile.name ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile__group">
                    <label htmlFor="surname" className="profile__label">
                      {t("pages.profile.surnamev")}
                    </label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      placeholder={t("pages.profile.surname")}
                      className="form__input input"
                      value={profile.surname ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="profile__item">
              <h2 className="profile__subtitle title-3">
                {t("pages.profile.contacts")}
              </h2>
              <div className="profile__content">
                <div className="profile__inputs">
                  <div className="profile__group">
                    <label htmlFor="email" className="profile__label">
                      {t("pages.profile.emailv")}
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder={t("pages.profile.email")}
                      className="form__input input"
                      value={profile.user.email ?? ""}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div className="profile__group">
                    <label htmlFor="phone_number" className="profile__label">
                      {t("pages.profile.phonev")}
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      name="phone_number"
                      placeholder={t("pages.profile.phone")}
                      className="form__input input"
                      value={profile.phone_number ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="profile__item">
              <h2 className="profile__subtitle title-3">
                {t("pages.profile.address")}
              </h2>
              <div className="profile__content">
                <div className="profile__inputs">
                  <div className="profile__group">
                    <label htmlFor="state" className="profile__label">
                      {t("pages.profile.statev")}
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder={t("pages.profile.state")}
                      className="form__input input"
                      value={profile.state ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile__group">
                    <label htmlFor="city" className="profile__label">
                      {t("pages.profile.cityv")}
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder={t("pages.profile.city")}
                      className="form__input input"
                      value={profile.city ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile__group">
                    <label htmlFor="street" className="profile__label">
                      {t("pages.profile.streetv")}
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      placeholder={t("pages.profile.street")}
                      className="form__input input"
                      value={profile.street ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile__group">
                    <label htmlFor="apartment" className="profile__label">
                      {t("pages.profile.apartmentv")}
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      placeholder={t("pages.profile.apartment")}
                      className="form__input input"
                      value={profile.apartment ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
