'use client';

import { useState } from 'react';
import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import {
    FormProvider,
    useForm,
    useFormContext,
    Controller,
    SubmitHandler,
} from 'react-hook-form';
import { getOrCreateDeviceId, setAccessToken } from '@/lib/utils';
import toast from 'react-hot-toast';
import { apiRequest } from '@/helper/api.helper';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

type SignupFormValues = {
    firstName: string;
    lastName: string;
    phoneNo: string;
    countryCode: string;
    dob: string;
    gender: string;
    email: string;
    password: string;
    otp: string;
};

const Step1 = () => {
    const { register } = useFormContext<SignupFormValues>();
    return (
        <div className="flex flex-col gap-4 w-full text-gray-600">
            <div className="flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="border outline-none border-gray-400 px-2 py-3 rounded-lg"
                    placeholder="First Name"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="border outline-none border-gray-400 px-2 py-3 rounded-lg"
                    placeholder="Last Name"
                />
            </div>
        </div>
    );
};

const Step2 = () => {
    const { register } = useFormContext<SignupFormValues>();
    return (
        <div className="flex flex-col gap-4 w-full text-gray-600">
            <div className="flex flex-col gap-2">
                <label htmlFor="phoneNo">Phone No.</label>
                <div className="flex">
                    <select
                        {...register('countryCode')}
                        className="border border-r-0 outline-none border-gray-400 px-2 py-3 rounded-l-lg"
                    >
                        <option value="+91">India</option>
                        <option value="+01">USA</option>
                        <option value="+02">China</option>
                        <option value="+08">UAE</option>
                        <option value="+03">New York</option>
                        <option value="+078">Bahrain</option>
                    </select>
                    <input
                        type="text"
                        {...register('phoneNo')}
                        className="border outline-none w-full border-gray-400 px-2 py-3 rounded-r-lg"
                        placeholder="Phone Number"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="dob">Choose DOB</label>
                <input
                    type="date"
                    {...register('dob')}
                    className="border outline-none w-full border-gray-400 px-2 py-3 rounded-lg"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="gender">Gender</label>
                <select
                    {...register('gender')}
                    className="border outline-none border-gray-400 px-2 py-3 rounded-lg"
                >
                    <option value="">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    );
};

const Step3 = () => {
    const { control } = useFormContext<SignupFormValues>();
    return (
        <div className="flex flex-col gap-4 w-full">
            <label htmlFor="otp">Enter The OTP Here</label>
            <Controller
                control={control}
                name="otp"
                render={({ field }) => (
                    <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                        <InputOTPGroup className="space-x-3">
                            {[0, 1, 2].map((i) => (
                                <InputOTPSlot
                                    key={i}
                                    index={i}
                                    className="h-14 w-12 text-xl text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            ))}
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="space-x-3">
                            {[3, 4, 5].map((i) => (
                                <InputOTPSlot
                                    key={i}
                                    index={i}
                                    className="h-14 w-12 text-xl text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                )}
            />
        </div>
    );
};

const Step4 = () => {
    const { register } = useFormContext<SignupFormValues>();
    return (
        <div className="flex flex-col gap-2 text-gray-600">
            <label htmlFor="email">Choose an email</label>
            <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
                <input
                    type="text"
                    {...register('email')}
                    placeholder="yourname"
                    className="px-2 py-3 outline-none w-full"
                />
                <span className="bg-gray-100 px-3 py-3 text-gray-500 text-sm select-none">
                    @iongo.com
                </span>
            </div>
        </div>
    );
};

const Step5 = () => {
    const { register } = useFormContext<SignupFormValues>();
    return (
        <div className="flex flex-col gap-2 text-gray-600">
            <label htmlFor="password">Set your password</label>
            <input
                type="password"
                {...register('password')}
                placeholder="Password..."
                className="px-2 py-3 outline-none w-full border border-gray-400 rounded-lg"
            />
        </div>
    );
};

const Signup = () => {
    const router = useRouter()
    const [step, setStep] = useState(1);
    const methods = useForm<SignupFormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNo: '',
            countryCode: '+91',
            dob: '',
            gender: '',
            email: '',
            password: '',
            otp: '',
        },
    });

    const deviceId = getOrCreateDeviceId()

    const handleNextStep = async () => {
        let fieldsToValidate: (keyof SignupFormValues)[] = [];

        if (step === 1) fieldsToValidate = ['firstName', 'lastName'];
        else if (step === 2) fieldsToValidate = ['phoneNo', 'countryCode', 'dob', 'gender'];
        else if (step === 3) fieldsToValidate = ['otp'];
        else if (step === 4) fieldsToValidate = ['email'];
        else if (step === 5) fieldsToValidate = ['password'];

        const isValid = await methods.trigger(fieldsToValidate);
        if (!isValid) return;

        const values = methods.getValues();

        try {
            if (step === 2) {
                const PATH = `${process.env.NEXT_PUBLIC_SEND_OTP_API}`;
                const res = await apiRequest("post", PATH, {
                    phoneNo: values.phoneNo,
                    countryCode: values.countryCode,
                });
                console.log('res is >>>>>>>>>', res)
                toast.success('OTP Sent Successfully');
            }

            if (step === 3) {
                const PATH = `${process.env.NEXT_PUBLIC_VERIFY_OTP_API}`;
                const res = await apiRequest("post", PATH, {
                    phoneNo: values.phoneNo,
                    countryCode: values.countryCode,
                    otp: values.otp,
                });
                if (res.data.success) {
                    toast.success('OTP Verified');
                } else {
                    toast.error('OTP Verification Failed');
                    return;
                }
            }

            setStep((prev) => prev + 1);
        } catch (err: any) {
            console.error('Step API error:', err);
            toast.error(err?.response?.data?.message || 'Something went wrong');
        }
    };


    const handleSubmit: SubmitHandler<SignupFormValues> = async (data) => {
        const PATH = `${process.env.NEXT_PUBLIC_SIGNUP_API}`
        const res = await apiRequest("post", PATH, {
            ...data, deviceId,
            deviceToken: 'random-token', email: `${data.email}@iongo.com`
        });
        if (res.data.success) {
            setAccessToken(res.data.data.accessToken)
            router.push('/');
        };
    };

    return (
        <section className="flex justify-center items-center w-full h-dvh">
            <div className="bg-white max-w-4xl flex items-center justify-between px-3 w-full h-[480px] drop-shadow-2xl border-gray-300 rounded-2xl border">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex items-center gap-6 w-full">
                        <div className="h-full flex items-center justify-center w-full">
                            <Image
                                src={`/assets/${step === 1
                                    ? 'signup_image.svg'
                                    : step === 2
                                        ? 'Login-cuate.svg'
                                        : 'Sign-up-cuate.svg'}`}
                                alt="signup"
                                width={300}
                                height={300}
                            />
                        </div>

                        <div className="flex flex-col justify-between w-full h-full">
                            <div className="flex flex-col gap-4 p-4">
                                {step === 1 && <Step1 />}
                                {step === 2 && <Step2 />}
                                {step === 3 && <Step3 />}
                                {step === 4 && <Step4 />}
                                {step === 5 && <Step5 />}
                                <p className='text-gray-700'>
                                    Already have an account ? Try
                                    <Link
                                        className='ms-2 underline text-blue-700 font-medium'
                                        href={'/auth/login'}
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>

                            <div className="w-full flex gap-2 justify-end mt-4 px-4 pb-4">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep((prev) => prev - 1)}
                                        className="bg-white flex items-center justify-center gap-2 w-[200px] py-2.5 rounded-md text-gray-700 border border-gray-400 font-medium text-lg"
                                    >
                                        <MoveLeft /> Go Back
                                    </button>
                                )}

                                {step < 5 && (
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="bg-blue-700 flex items-center justify-center gap-2 w-[200px] py-2.5 rounded-md text-white font-medium text-lg"
                                    >
                                        Next <MoveRight />
                                    </button>
                                )}

                                {step === 5 && (
                                    <button
                                        type="submit"
                                        className="bg-green-700 flex items-center justify-center gap-2 w-[200px] py-2.5 rounded-md text-white font-medium text-lg"
                                    >
                                        Finish <MoveRight />
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
};

export default Signup;
