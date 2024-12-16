import React, { useState } from 'react';
import useFormStore from '@/store/formStore';
import Loader from '@/components/loader';
import Toast from '@/components/toast';
import { ActionTypes } from '@/types';
import useToastStore from '@/store/toastStore';
import api from '@/utils/api';
import useUserStore from '@/store/userStore'; // Axios instance for API calls

interface UserFormInputProps {
  onClose: any;
}

const UserForm: React.FC<UserFormInputProps> = ({ onClose }) => {
  const { id, name: updateName, email: updateEmail } = useFormStore();

  const [name, setName] = useState(updateName);
  const [email, setEmail] = useState(updateEmail);
  const [isLoading, setIsLoading] = useState(false);

  const { showToast, action, errorMessage, setToastData, setShowToast } = useToastStore();
  const { setUsers, page, setTotalUsers } = useUserStore();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/user/all', {
        params: {
          limit: 6,
          page,
          searchText: '',
        },
      });

      const { data, results } = response?.data;

      setUsers(data?.users);
      setTotalUsers(results);
    } catch (error: any) {
      setShowToast(true);
      setToastData(ActionTypes.ERROR, error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!id) {
        // Create user
        await api.post('/user/create', { name, email });
        setShowToast(true);
        setToastData(ActionTypes.CREATED, undefined);
      } else {
        // Update user
        await api.patch(`/user/${id}`, { name, email });
        setShowToast(true);
        setToastData(ActionTypes.UPDATED, undefined);
      }

      // Clear form and close modal
      setName('');
      setEmail('');
      await fetchUsers();
      onClose();
    } catch (error: any) {
      setShowToast(true);
      setToastData(ActionTypes.ERROR, error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={onClose}
      >
        <div
            className="relative top-20 p-5 border lg:mx-auto md:mx-auto sm:mx-auto ml-5 mr-5 max-w-md shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#2B86C5]">
            {id ? 'Update User' : 'Add New User'}
          </h2>
          {isLoading && <Loader />}
          {showToast && <Toast action={action as ActionTypes} errorMessage={errorMessage} />}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                  required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                  required
              />
            </div>
            <div className="flex justify-between">
              <button
                  type="submit"
                  className="mt-2 bg-[#2B86C5] hover:bg-[#7150a3] text-white font-bold py-2 px-4 rounded"
              >
                {id ? 'Update' : 'Submit'}
              </button>
              <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default UserForm;
