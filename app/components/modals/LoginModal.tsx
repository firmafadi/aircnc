'use client';

import axios, { Axios } from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const LoginModal = () => {

    const router = useRouter()
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.error) {
                toast.error(callback.error);
            }else if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }else{
                toast.error('Something went wrong');
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome back to aircnc'
                subtitle='Login to your account'
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={()=>{signIn('github')}}
            />
            <div 
                className='
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                '
            >
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        First time using AirCnc ?
                    </div>
                    <div
                        className='
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        '
                    >
                        Create Account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Log in'
            actionLabel='Login'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}
export default LoginModal;
