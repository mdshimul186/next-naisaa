import React from 'react'
import ProfileLayout from '../../components/ProfileLayout'

import { useSelector } from 'react-redux'

function UserProfile() {
    const { profile } = useSelector(state => state.auth)
    return (
        <div>
           
            <ProfileLayout title="Profile">
                profile
            </ProfileLayout>
        </div>
    )
}

export default UserProfile
