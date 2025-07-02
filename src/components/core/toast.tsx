import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/hooks';
// import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { removeMessage } from '@/src/reducers/messageSlice';

const Toast: React.FC = () => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state: RootState) => state.rootReducer.message);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messages.length > 0) {
        dispatch(removeMessage(messages[0].id));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [messages, dispatch]);

  if (messages.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`px-4 py-2 rounded-md shadow-lg text-white ${
            message.type === 'success' ? 'bg-green-500' :
            message.type === 'error' ? 'bg-red-500' :
            message.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
          }`}
        >
          {message.text}
          <button
            onClick={() => dispatch(removeMessage(message.id))}
            className="ml-2"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;