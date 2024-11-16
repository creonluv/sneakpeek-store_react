import React, { useEffect, useState } from "react";

import { getMyProfile, editMyProfile } from "../../api/profile";
import { editUser } from "../../api/user";

import { Profile } from "../../types/Profile";

import MySwal from "../../shared/utils/myswal";

import styles from "./ProfilePage.module.scss";

interface PasswordData {
  old_password: string,
  new_password: string,
  confirm_new_password: string,
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [initialProfile, setInitialProfile] = useState<Profile | null>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [formData, setFormData] = useState<PasswordData>({
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  });

  const handleSubmit = async (data: PasswordData) => {
    const { old_password, new_password, confirm_new_password } = data;

    if (!old_password || !new_password || !confirm_new_password) {
      MySwal.fire({
        title: 'Error!',
        text: 'All fields are required!',
        icon: 'error',
      });
      return;
    }

    if (new_password !== confirm_new_password) {
      MySwal.fire({
        title: 'Error!',
        text: 'New password and confirmation do not match!',
        icon: 'error',
      });
      return;
    }

    try {
      // TODO password api
      MySwal.fire({
        title: 'Success!',
        text: 'Your password has been successfully changed.',
        icon: 'success',
      });
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: 'There was an error changing your password.',
        icon: 'error',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      const { name, value } = e.target;
  
      if (name === 'username' || name === 'email') {
        const updatedProfile = { 
          ...profile, 
          user: { 
            ...profile.user, 
            [name]: value 
          } 
        };
        setProfile(updatedProfile);
        setIsChanged(JSON.stringify(updatedProfile) !== JSON.stringify(initialProfile));
      }
  
      else if (name === 'phone') {
        const updatedProfile = { 
          ...profile, 
          phone_number: value 
        };
        setProfile(updatedProfile);
        setIsChanged(JSON.stringify(updatedProfile) !== JSON.stringify(initialProfile));
      }
  
      else {
        const updatedProfile = { ...profile, [name]: value };
        setProfile(updatedProfile);
        setIsChanged(JSON.stringify(updatedProfile) !== JSON.stringify(initialProfile));
      }
    }
  };
  

  const handleSave = async () => {
    if (profile) {
      try {
        if (profile.user.username !== initialProfile?.user.username || profile.user.email !== initialProfile?.user.email) {
          await editUser({id: profile.user.id, username: profile.user.username, email: profile.user.email}, profile.user.id);
        }

        const response = await editMyProfile(profile, profile.id);
        console.log("Profile updated successfully", response);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
      setInitialProfile(profile);
      setIsChanged(false);
    }
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setIsChanged(false);
  };

  const openModal = () => {
    MySwal.fire({
      title: 'Change Password',
      html: `
        <div class="group">
          <input id="old_password" class="input" placeholder="Old password" value="${formData.old_password}" type="password">
          <input id="new_password" class="input" placeholder="New password" value="${formData.new_password}" type="password">
          <input id="confirm_new_password" class="input" placeholder="Confirm new password" value="${formData.confirm_new_password}" type="password">
        </div>
      `,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const old_password = (document.getElementById('old_password') as HTMLInputElement).value;
        const new_password = (document.getElementById('new_password') as HTMLInputElement).value;
        const confirm_new_password = (document.getElementById('confirm_new_password') as HTMLInputElement).value;
        setFormData({
          old_password,
          new_password,
          confirm_new_password,
        });
        handleSubmit({ old_password, new_password, confirm_new_password });
      }
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        console.log(data);
        setProfile(data);
        setInitialProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    fetchProfile();
  }, []);

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
                className={`${styles.profile__button} button button_sm button_default ${!isChanged ? "_disabled" : ""}`}
                onClick={handleSave}
                disabled={!isChanged}
              >
                Save
              </button>
              <button
                className={`${styles.profile__button} button button_sm button_reverse ${!isChanged ? "_disabled" : ""}`}
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
                  <img
                    className={styles.profile__img}
                    src={profile?.image?.id ? `https://localhost:9091/api/images/${profile?.image?.id}` : ""}
                    alt="User"
                  />
                  <div className={styles.profile__block}>
                    <div className={styles.profile__username}>{profile?.user?.username}</div>
                    <div className={`${styles.profile__id} text-muted`}>ID: {profile?.id}</div>
                    <button className={`${styles.profile__changePassword} button button_sm button_ghost`} onClick={openModal}>
                      Change password
                    </button>
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
                      value={profile?.name}
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
                      value={profile?.surname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.profile__group}>
                    <label htmlFor="username" className={styles.profile__label}>Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={styles.profile__input}
                      value={profile?.user?.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.profile__group}>
                    <label className={styles.profile__label}>Role</label>
                    <span className={styles.profile__input}>{profile?.user?.role?.name}</span>
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
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className={styles.profile__input}
                      value={profile?.user?.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.profile__group}>
                    <label htmlFor="phone" className={styles.profile__label}>Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className={styles.profile__input}
                      value={profile?.phone_number}
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
                    <label htmlFor="country" className={styles.profile__label}>Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className={styles.profile__input}
                      value={profile?.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.profile__group}>
                    <label htmlFor="state" className={styles.profile__label}>State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className={styles.profile__input}
                      value={profile?.state}
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
                      value={profile?.city}
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
                      value={profile?.street}
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
                      value={profile?.apartment}
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
