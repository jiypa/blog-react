// 登录/注册弹窗组件
import React, {
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Box,
	Button,
	Dialog,
	IconButton,
	TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';
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
		<Dialog open={open} onClose={() => dismiss()}>
			<Box className={styles.container}>
				<IconButton
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
					}}
					onClick={() => dismiss()}
				>
					<Close/>
				</IconButton>
				<Box className={styles.title}>
					{isLogin ? '欢迎登录' : '欢迎注册'}
				</Box>
				<Separator/>
				<TextField
					required={!isLogin}
					className={styles.textField}
					label={'用户名'}
					value={username}
					helperText={'请输入您的用户名'}
					variant={'standard'}
					onChange={(event) => setUserName(event.target.value)}
				/>
				<TextField
					required={!isLogin}
					className={styles.textField}
					label={'密码'}
					type={'password'}
					value={password}
					helperText={'请输入您的密码'}
					variant={'standard'}
					onChange={(event) => setPassword(event.target.value)}
				/>
				{
					!isLogin ? <TextField
						className={styles.textField}
						label={'邮箱'}
						value={email}
						helperText={'请输入您的邮箱'}
						variant={'standard'}
						onChange={(event) => setEmail(event.target.value)}
					/> : null
				}
				<Button
					style={{ width: 300, margin: '20px 0' }}
					variant={'contained'}
					onClick={() => isLogin ? login() : register()}
				>
					{isLogin ? '登录' : '注册'}
				</Button>
				{
					isLogin ? <Box className={styles.tipText}>
						<Button variant={'text'} onClick={() => {
							setIsLogin(false);
							clearTextField();
						}}>{'还未注册？去注册 >'}</Button>
					</Box> : null
				}
			</Box>
		</Dialog>
	);
});
