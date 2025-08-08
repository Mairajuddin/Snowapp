import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { Loader, Check, X } from 'lucide-react';

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <>
      {toasts.map(toast => (
        <Snackbar
          key={toast.id}
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ bottom: 24 }}
          onClose={() => removeToast(toast.id)}
        >
          <Alert
            onClose={() => removeToast(toast.id)}
            severity={toast.type}
            sx={{
              width: '100%',
              bgcolor: toast.type === 'error' ? '#FF5757' :
                      toast.type === 'success' ? '#00C48C' : '#7DC4FF',
              color: '#0B1523',
              fontWeight: 600
            }}
            iconMapping={{
              pending: <Loader size={20} className="animate-spin" />,
              success: <Check size={20} />,
              error: <X size={20} />
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default ToastContainer;
