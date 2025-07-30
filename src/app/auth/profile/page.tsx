'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/Store';
import { useEffect, useState } from 'react';
import { UserInterface } from '@/lib/interfaces/user.interface';
import { logout } from '@/lib/redux/slices/auth.slice';
import { apiRequest } from '@/helper/api.helper';
import { toast } from 'react-hot-toast';
import ImagePreview from '@/components/common/ImagePreview';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const Profile = () => {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const [form, setForm] = useState<UserInterface | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('/assets/avatar_placeholder.png');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    useEffect(() => {
        if (user) {
            setForm(user);
            if (user.profilePhoto) {
                setImagePreview(user.profilePhoto);
            }
        }
    }, [user]);

    const handleChange = (key: keyof UserInterface, value: string) => {
        if (!form) return;
        setForm({ ...form, [key]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!form) return;

        const formData = new FormData();
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('dob', form.dob);
        formData.append('gender', form.gender);
        if (profileImage) {
            formData.append('profilePhoto', profileImage);
        }

        try {
            const res = await apiRequest('put', `${process.env.NEXT_PUBLIC_UPDATE_PROFILE_API}`, formData);
            if (res.data.success) {
                toast.success('Profile updated successfully');
            } else {
                toast.error(res.data.message || 'Update failed');
            }
        } catch (err) {
            toast.error('Something went wrong');
            console.error(err);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!form) return <div className="p-10 text-center text-gray-500">Loading profile...</div>;

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-slate-100 to-slate-300 text-gray-800">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-10">
                <div className='w-full'>
                    <button onClick={() => router.back()}>
                        <ArrowLeft />
                    </button>
                </div>
                {/* Profile Image */}
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-600 shadow">
                    <ImagePreview
                        src={imagePreview}
                        width={1000}
                        height={1000}
                        alt="Profile"
                        className="object-cover w-full h-full"
                    />
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />

                {/* User Info Form */}
                <div className="w-full space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={form.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            placeholder="First Name"
                            className="border px-3 py-2 rounded w-full"
                        />
                        <input
                            type="text"
                            value={form.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            placeholder="Last Name"
                            className="border px-3 py-2 rounded w-full"
                        />
                        <input
                            type="email"
                            value={form.email}
                            disabled
                            className="border px-3 py-2 rounded bg-gray-100 col-span-2"
                        />
                        <input
                            type="text"
                            value={form.phoneNo}
                            disabled
                            className="border px-3 py-2 rounded bg-gray-100 col-span-2"
                        />
                        <input
                            type="date"
                            value={form.dob}
                            onChange={(e) => handleChange('dob', e.target.value)}
                            className="border px-3 py-2 rounded w-full"
                        />
                        <select
                            value={form.gender}
                            onChange={(e) => handleChange('gender', e.target.value)}
                            className="border px-3 py-2 rounded w-full"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleSave}
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
