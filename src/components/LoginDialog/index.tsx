// 登录/注册弹窗组件
import React, {
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Modal,
	Button,
	TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';
import useRequest, { Response } from '../../hooks/useRequest';
import useToken from '../../hooks/useToken';
import useToast from '../../hooks/useToast';
import Separator from '../Separator';
import styles from './index.module.less';

export interface LoginDialogRef {
	show: () => void;
	dismiss: () => void;
	setLoginDialogStatus: (status: boolean) => void;
}

export default forwardRef(function LoginDialog(props, ref) {
	const [open, setOpen] = useState<boolean>(false);
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [username, setUserName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const { request } = useRequest();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [token, setToken] = useToken();
	const { toast } = useToast();

	useImperativeHandle(ref, () => ({
		dismiss,
		show() {
			setOpen(true);
		},
		// status：true 登录 false 注册
		setLoginDialogStatus(status: boolean) {
			setIsLogin(status);
		},
	}), []);

	function login() {
		request.post<Response>('/login', {
			username,
			password,
		})
			.then(({ msg, data: { token } }) => {
				toast(msg, 'success');
				setToken(token);
				dismiss();
			})
			.catch((err) => {
				toast(err);
			});
	}

	function register() {
		request.post<Response>('/register', {
			username,
			password,
			email,
		})
			.then(({ msg, data: { token } }) => {
				toast(msg, 'success');
				setToken(token);
				dismiss();
			})
			.catch((err) => {
				toast(err);
			});
	}

	function clearTextField() {
		setUserName('');
		setPassword('');
		setEmail('');
	}

	function dismiss() {
		setOpen(false);
		clearTextField();
	}

	return (
		<Modal open={open} onClose={() => dismiss()}>
			<section className={styles.container}>
				<Icon
					icon={'ic:round-close'}
					width={'1.2rem'}
					height={'1.2rem'}
					style={{
						position: 'absolute',
						top: '.5rem',
						right: '.5rem',
					}}
					onClick={() => dismiss()}
				/>
				<header className={styles.title}>
					{isLogin ? '欢迎登录' : '欢迎注册'}
				</header>
				<Separator/>
				<div className={styles.content}>
					<TextField
						required={!isLogin}
						label={'用户名'}
						value={username}
						helperText={'请输入您的用户名'}
						variant={'standard'}
						onChange={(event) => setUserName(event.target.value)}
					/>
					<TextField
						required={!isLogin}
						label={'密码'}
						type={'password'}
						value={password}
						helperText={'请输入您的密码'}
						variant={'standard'}
						onChange={(event) => setPassword(event.target.value)}
					/>
					{
						!isLogin ? <TextField
							label={'邮箱'}
							value={email}
							helperText={'请输入您的邮箱'}
							variant={'standard'}
							onChange={(event) => setEmail(event.target.value)}
						/> : null
					}
					<Button
						variant={'contained'}
						onClick={() => isLogin ? login() : register()}
					>
						{isLogin ? '登录' : '注册'}
					</Button>
					{
						isLogin ? <span className={styles.tipText} onClick={() => {
							setIsLogin(false);
							clearTextField();
						}}>
							{'还未注册？去注册 >'}
						</span> : <span className={styles.tipText} onClick={() => {
							setIsLogin(true);
							clearTextField();
						}}>
							{'已有账号？去登录 >'}
						</span>
					}
				</div>
			</section>
		</Modal>
	);
});
