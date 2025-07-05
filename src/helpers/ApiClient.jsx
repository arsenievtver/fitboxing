import axios from 'axios';
import { PREFIX, JWT_STORAGE_KEY, refreshUrl } from './constants';

const REFRESH_TOKEN_KEY = 'refresh_token_ios';

function isIOS() {
	return /iPhone|iPad|iPod/.test(navigator.userAgent);
}

// Универсальный метод обновления токена
export async function refreshTokenManually() {
	const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY);

	try {
		let data;

		if (isIOS()) {
			if (!refresh_token) throw new Error('Missing refresh token on iOS');
			({ data } = await axios.post(`${refreshUrl}?refresh_token=${refresh_token}`));
		} else {
			({ data } = await axios.post(refreshUrl, {}, { withCredentials: true }));
		}

		const newToken = data.access_token;
		localStorage.setItem(JWT_STORAGE_KEY, newToken);
		return newToken;

	} catch (e) {
		console.warn('🔁 Ошибка при refresh:', e.message || e);
		localStorage.removeItem(JWT_STORAGE_KEY);
		if (isIOS()) localStorage.removeItem(REFRESH_TOKEN_KEY);
		throw e;
	}
}

export function createApi(navigate) {
	const api = axios.create({
		baseURL: PREFIX,
		withCredentials: true
	});

	// ⛳ Подставляем access token в каждый запрос
	api.interceptors.request.use(cfg => {
		if (!cfg.url.includes('refresh')) {
			const t = localStorage.getItem(JWT_STORAGE_KEY);
			if (t) cfg.headers.Authorization = `Bearer ${t}`;
		}
		return cfg;
	});

	let refreshing = false;
	let queue = [];

	const subscribe = (cb) => queue.push(cb);
	const publish = (tok, err) => {
		queue.forEach(cb => cb(tok, err));
		queue = [];
	};

	// ⛳ Обрабатываем ошибки
	api.interceptors.response.use(
		resp => resp,
		async (err) => {
			const { response, config } = err;
			const original = config;

			if (response?.status === 401 && !original._retry) {
				if (refreshing) {
					return new Promise((res, rej) =>
						subscribe((tok, e) => e
							? rej(e)
							: res(api({
								...original,
								headers: { ...original.headers, Authorization: `Bearer ${tok}` }
							}))
						)
					);
				}

				original._retry = true;
				refreshing = true;

				try {
					const newToken = await refreshTokenManually();

					api.defaults.headers.Authorization = `Bearer ${newToken}`;
					original.headers.Authorization = `Bearer ${newToken}`;
					localStorage.setItem(JWT_STORAGE_KEY, newToken);

					publish(newToken);
					return api(original);
				} catch (e) {
					publish(null, e);
					navigate('/');
					return Promise.reject(e);
				} finally {
					refreshing = false;
				}
			}

			return Promise.reject(err);
		}
	);

	return api;
}
