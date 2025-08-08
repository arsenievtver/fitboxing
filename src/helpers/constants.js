export const PREFIX = 'https://fitbox.bounceme.net';
export const loginUrl = '/api/v1/auth/jwt/login';
export const refreshUrl = '/api/v1/auth/jwt/refresh';
export const JWT_STORAGE_KEY = 'jwt_token';
export const registerUrl = '/api/v1/auth/register';
export const logoutUrl = '/api/v1/auth/jwt/logout';
export const getSlotsUrl = (start_time, stop_time) =>
	`/api/v1/slots/?time__gt=${encodeURIComponent(start_time)}&time__lt=${encodeURIComponent(stop_time)}`;
export const getSlotsByIdsUrl = (ids) =>
	`/api/v1/slots/?id__in=${ids.join(',')}`
export const postBookingUrl = '/api/v1/bookings/';
export const deleteBookingUrl = (id) => `/api/v1/bookings/${id}`;
export const postWeightMeUrl = '/api/v1/records/';
export const postAvatarMeUrl = '/api/v1/users/add_photo';