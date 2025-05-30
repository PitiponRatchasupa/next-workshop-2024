import '../../public/plugins/fontawesome-free/css/all.min.css';
import '../../public/dist/css/adminlte.min.css';
import React from 'react';

export default function SignInLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <>
            <div className='hold-transition login-page'>{children}</div>
        </>
    )
}
