export type messages =
  | LoginPageMessages
  | RegisterPageMessages
  | ProfilePageMessages
  | ChangePasswordMessages
  | FavouritePageMessages
  | BucketPageMessages
  | ProductPageMessages
  | CheckoutPageMessages;

type ModalState = 'error' | 'success' | 'warning';

export enum LoginPageMessages {
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
}

export enum RegisterPageMessages {
  REGISTER_ERROR = "REGISTER_ERROR",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_WARNING = "REGISTER_WARNING",
}

export enum ProfilePageMessages {
  PROFILE_LOAD_ERROR = "PROFILE_LOAD_ERROR",
  PROFILE_IMAGE_ERROR = "PROFILE_IMAGE_ERROR",
  PROFILE_UPDATE_ERROR = "PROFILE_UPDATE_ERROR",
  PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS",
}

export enum ChangePasswordMessages {
  ALL_FIELDS_REQUIRED = "CHANGEPASSWORD_ALL_FIELDS_REQUIRED",
  INVALID_PASSWORD_CONFIRMATION = "INVALID_PASSWORD_CONFIRMATION",
  CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR",
  CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
}

export enum FavouritePageMessages {
  FETCH_FAVOURITE_ERROR = "FETCH_FAVOURITE_ERROR",
  DELETE_FAVOURITE_ERROR = "DELETE_FAVOURITE_ERROR",
  TOGGLE_FAVOURITE_ERROR = "TOGGLE_FAVOURITE_ERROR",
  FETCH_FAVOURITE_SUCCESS = "FETCH_FAVOURITE_SUCCESS",
  DELETE_FAVOURITE_SUCCESS = "DELETE_FAVOURITE_SUCCESS",
  TOGGLE_FAVOURITE_SUCCESS = "TOGGLE_FAVOURITE_SUCCESS",
}

export enum BucketPageMessages {
  FETCH_BUCKET_ERROR = "FETCH_BUCKET_ERROR",
  FETCH_BUCKET_SUCCESS = "FETCH_BUCKET_SUCCESS",
  TOGGLE_BUCKET_ERROR = "TOGGLE_BUCKET_ERROR",
  TOGGLE_BUCKET_SUCCESS = "TOGGLE_BUCKET_SUCCESS",
  UPDATE_BUCKET_ERROR = "UPDATE_BUCKET_ERROR",
  UPDATE_BUCKET_SUCCESS = "UPDATE_BUCKET_SUCCESS",
  DELETE_BUCKET_ERROR = "DELETE_BUCKET_ERROR",
  DELETE_BUCKET_SUCCESS = "DELETE_BUCKET_SUCCESS",
}

export enum ProductPageMessages {
  FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR",
  FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
}

export enum CheckoutPageMessages {
  CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR",
}

const ModalMessages: Record<messages, { title: string; description: string; state: ModalState }> = {
  // Login page modal messages
  [LoginPageMessages.LOGIN_ERROR]: {
    title: "Login Error",
    description: "An error occurred during the login process. Please try again.",
    state: 'error',
  },
  [LoginPageMessages.LOGIN_SUCCESS]: {
    title: "Login Success",
    description: "You have successfully logged in. Redirecting to the homepage...",
    state: 'success',
  },

  // Register page modal messages
  [RegisterPageMessages.REGISTER_ERROR]: {
    title: "Registration Error",
    description: "An error occurred during registration. Please try again.",
    state: 'error',
  },
  [RegisterPageMessages.REGISTER_SUCCESS]: {
    title: "Registration Success",
    description: "Registration was successful. Redirecting to the homepage...",
    state: 'success',
  },
  [RegisterPageMessages.REGISTER_WARNING]: {
    title: "Warning",
    description: "You must agree to the terms and conditions before proceeding.",
    state: 'warning',
  },

  // Profile page modal messages
  [ProfilePageMessages.PROFILE_LOAD_ERROR]: {
    title: "Profile Load Error",
    description: "Failed to load the profile. Please try again later.",
    state: 'error',
  },
  [ProfilePageMessages.PROFILE_IMAGE_ERROR]: {
    title: "Profile Image Error",
    description: "There was an issue updating your profile image. Please try again.",
    state: 'error',
  },
  [ProfilePageMessages.PROFILE_UPDATE_ERROR]: {
    title: "Profile Update Error",
    description: "Failed to update profile information. Please try again.",
    state: 'error',
  },
  [ProfilePageMessages.PROFILE_UPDATE_SUCCESS]: {
    title: "Profile Update Success",
    description: "Your profile has been successfully updated.",
    state: 'success',
  },
  
  [ChangePasswordMessages.ALL_FIELDS_REQUIRED]: {
    title: "Fields Required",
    description: "All fields are required. Please fill out all fields before proceeding.",
    state: 'error',
  },
  [ChangePasswordMessages.INVALID_PASSWORD_CONFIRMATION]: {
    title: "Password Confirmation Error",
    description: "New password and confirmation do not match. Please try again.",
    state: 'error',
  },
  [ChangePasswordMessages.CHANGE_PASSWORD_ERROR]: {
    title: "Password Change Error",
    description: "There was an error changing your password. Please try again.",
    state: 'error',
  },
  [ChangePasswordMessages.CHANGE_PASSWORD_SUCCESS]: {
    title: "Password Change Success",
    description: "Your password has been successfully changed.",
    state: 'success',
  },

  // Favourite page modal messages
  [FavouritePageMessages.FETCH_FAVOURITE_ERROR]: {
    title: "Favourite Load Error",
    description: "Failed to load your favourite items. Please try again.",
    state: 'error',
  },
  [FavouritePageMessages.DELETE_FAVOURITE_ERROR]: {
    title: "Delete Favourite Error",
    description: "Failed to remove item from favourites. Please try again.",
    state: 'error',
  },
  [FavouritePageMessages.TOGGLE_FAVOURITE_ERROR]: {
    title: "Update Favourite Error",
    description: "Failed to update favourite item. Please try again.",
    state: 'error',
  },
  [FavouritePageMessages.FETCH_FAVOURITE_SUCCESS]: {
    title: "Favourite Load Success",
    description: "Your favourite items have been loaded successfully.",
    state: 'success',
  },
  [FavouritePageMessages.DELETE_FAVOURITE_SUCCESS]: {
    title: "Delete Favourite Success",
    description: "The item has been successfully removed from your favourites.",
    state: 'success',
  },
  [FavouritePageMessages.TOGGLE_FAVOURITE_SUCCESS]: {
    title: "Update Favourite Success",
    description: "Favourite item updated successfully.",
    state: 'success',
  },

  // Bucket page modal messages
  [BucketPageMessages.FETCH_BUCKET_ERROR]: {
    title: "Bucket Load Error",
    description: "Failed to load the shopping bucket. Please try again.",
    state: 'error',
  },
  [BucketPageMessages.FETCH_BUCKET_SUCCESS]: {
    title: "Bucket Load Success",
    description: "Your shopping bucket has been successfully loaded.",
    state: 'success',
  },
  [BucketPageMessages.TOGGLE_BUCKET_ERROR]: {
    title: "Bucket Update Error",
    description: "Failed to update item in your bucket. Please try again.",
    state: 'error',
  },
  [BucketPageMessages.TOGGLE_BUCKET_SUCCESS]: {
    title: "Bucket Update Success",
    description: "Item successfully updated in your shopping bucket.",
    state: 'success',
  },
  [BucketPageMessages.UPDATE_BUCKET_ERROR]: {
    title: "Bucket Update Error",
    description: "Failed to update item in the bucket. Please try again.",
    state: 'error',
  },
  [BucketPageMessages.UPDATE_BUCKET_SUCCESS]: {
    title: "Bucket Update Success",
    description: "Item has been successfully updated in the bucket.",
    state: 'success',
  },
  [BucketPageMessages.DELETE_BUCKET_ERROR]: {
    title: "Delete Bucket Error",
    description: "Failed to delete item from the shopping bucket. Please try again.",
    state: 'error',
  },
  [BucketPageMessages.DELETE_BUCKET_SUCCESS]: {
    title: "Delete Bucket Success",
    description: "Item successfully removed from the shopping bucket.",
    state: 'success',
  },

  // Product page modal messages
  [ProductPageMessages.FETCH_PRODUCTS_ERROR]: {
    title: "Product Fetch Error",
    description: "Failed to fetch product data. Please try again later.",
    state: 'error',
  },
  [ProductPageMessages.FETCH_PRODUCTS_SUCCESS]: {
    title: "Product Fetch Success",
    description: "Products have been loaded successfully.",
    state: 'success',
  },

  // Checkout page modal messages
  [CheckoutPageMessages.CREATE_ORDER_ERROR]: {
    title: "Order Creation Error",
    description: "There was an issue creating your order. Please try again.",
    state: 'error',
  },
};

export function getModalMessages(type: messages) {
  return ModalMessages[type];
}
