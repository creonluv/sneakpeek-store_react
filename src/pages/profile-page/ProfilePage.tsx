import React, { useEffect, useState } from "react";

import { useModalContext } from '../../context/ModalContext';

import { getMyProfile, editMyProfile, editMyImage } from "../../api/profile";
import { editUser } from "../../api/user";

import { BASE_URL } from "../../shared/utils/fetchClient";
import { ProfilePageMessages } from "../../shared/utils/modalMessages";

import { Profile } from "../../types/Profile";

import { UploadAvatar } from "../../components/upload-avatar";
import { ChangePassword } from "../../components/change-password/ChangePassword";

import styles from "./ProfilePage.module.scss";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [initialProfile, setInitialProfile] = useState<Profile | null>(null);

  const [src, setSrc] = useState<string | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [refreshProfile, setRefreshProfile] = useState<boolean>(false);

  const { showModal } = useModalContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!profile) return;

    const { name, value } = e.target;
    const updatedProfile = {
      ...profile,
      ...(name === 'username' || name === 'email'
        ? { user: { ...profile.user, [name]: value } }
        : { [name]: value }),
    };
    
    setProfile(updatedProfile);
    setIsChanged(JSON.stringify(updatedProfile) !== JSON.stringify(initialProfile));
  };

  const handleSave = async () => {
    if (!profile) return;

    const { user, id } = profile;

    if(isChanged) {
      try {
        await editMyProfile(profile, id);

        showModal(ProfilePageMessages.PROFILE_UPDATE_SUCCESS);
    
        setInitialProfile(profile);
        setRefreshProfile(prev => !prev);
      } catch (error) {
        showModal(ProfilePageMessages.PROFILE_UPDATE_ERROR);
        setProfile(initialProfile);
      } finally {
        setIsChanged(false);
      }
    }

    if(isImageChanged) {
      try {
        await editMyImage({ image: preview }, profile.id);
        setIsImageChanged(false);
        setRefreshProfile(prev => !prev);
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
      try {
        const data = await getMyProfile();
        setImageUrl(data?.image?.id ? `${BASE_URL}/images/${data?.image?.id}` : null);
        setProfile(data);
        setInitialProfile(data);
      } catch (error) {
        showModal(ProfilePageMessages.PROFILE_LOAD_ERROR);
      }
    };

    fetchProfile();
  }, [refreshProfile]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__body}>
          <div className={styles.profile__top}>
            <h1 className={`${styles.profile__title} title-3`}>User Profile</h1>
            <div className={styles.profile__buttons}>
              <button
                className={`${styles.profile__button} button button_sm button_default ${!isChanged && !isImageChanged ? "_disabled" : ""}`}
                onClick={handleSave}
                disabled={!isChanged && !isImageChanged}
              >
                Save
              </button>
              <button
                className={`${styles.profile__button} button button_sm button_reverse ${!isChanged && !isImageChanged ? "_disabled" : ""}`}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className={styles.profile__items}>
            <div className={styles.profile__item}>
              <h2 className={`${styles.profile__subtitle} title-3`}>Basic Info</h2>
              <div className={styles.profile__content}>
                <div className={styles.profile__info}>
                  <UploadAvatar profile={profile} setIsImageChanged={(value: boolean) => { setIsImageChanged(value) }} src={src} preview={preview} setSrc={(value: string | undefined) => {setSrc(value)}} setPreview={(value: string | undefined) => {setPreview(value)}} imageUrl={imageUrl} />
                  <div className={styles.profile__block}>
                    <div className={styles.profile__username}>{profile?.user?.username} {profile?.user?.role?.name}</div>
                    <div className={`${styles.profile__id} text-muted`}>ID: {profile?.id}</div>
                    <ChangePassword />
                  </div>
                </div>
                <div className={styles.profile__inputs}>
                  <div className={styles.profile__group}>
                    <label htmlFor="name" className={styles.profile__label}>Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={styles.profile__input}
                      value={profile.name ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.profile__group}>
                    <label htmlFor="surname" className={styles.profile__label}>Surname</label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      className={styles.profile__input}
                      value={profile.surname ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.profile__item}>
              <h2 className={`${styles.profile__subtitle} title-3`}>Contacts</h2>
              <div className={styles.profile__content}>
                <div className={styles.profile__inputs}>
                  <div className={styles.profile__group}>
                    <label htmlFor="email" className={styles.profile__label}>Email</label>
                    <span className={styles.profile__input}>{profile.user.email ?? ""}</span>
                  </div>
                  <div className={styles.profile__group}>
                    <label htmlFor="phone_number" className={styles.profile__label}>Phone</label>
                    <input
                      type="text"
                      id="phone_number"
                      name="phone_number"
                      className={styles.profile__input}
                      value={profile.phone_number ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.profile__item}>
              <h2 className={`${styles.profile__subtitle} title-3`}>Address</h2>
              <div className={styles.profile__content}>
                <div className={styles.profile__inputs}>
                  <div className={styles.profile__group}>
                    <label htmlFor="state" className={styles.profile__label}>State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className={styles.profile__input}
                      value={profile.state ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.profile__group}>
                    <label htmlFor="city" className={styles.profile__label}>City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className={styles.profile__input}
                      value={profile.city ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.profile__group}>
                    <label htmlFor="street" className={styles.profile__label}>Street</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      className={styles.profile__input}
                      value={profile.street ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.profile__group}>
                    <label htmlFor="apartment" className={styles.profile__label}>Apartment</label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      className={styles.profile__input}
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

export default ProfilePage;
