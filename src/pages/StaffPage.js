import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/StaffPage.css';

const StaffPage = ({ onLogout }) => {
    const [staff, setStaff] = useState(null);
    const [error, setError] = useState('');

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/staff/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the token
                },
            });
            setStaff(response.data);
        } catch (error) {
            setError('Error fetching staff details');
            console.error('Error fetching staff:', error.message || error);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <div className="page-wrapper">
            <div className="gradient-bg">
                <div className="gradients-container">
                    <div className="g1"></div>
                    <div className="g2"></div>
                    <div className="g3"></div>
                    <div className="g4"></div>
                    <div className="g5"></div>
                    <div className="interactive"></div>
                </div>
            </div>
            <div className="container">
                <aside className="sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <nav className="sidebar-nav">
                        <ul>
                            <li><Link to="/Home" className="nav-link">Home</Link></li>
                            <li><Link to="/Staff" className="nav-link">Staff Info</Link></li>
                            <li><Link to="/Users" className="nav-link">User Info</Link></li>
                            <li><Link to="/Books" className="nav-link">Books</Link></li>
                            <li><button className="nav-link logout-button" onClick={onLogout}>Log Out</button></li>
                        </ul>
                    </nav>
                </aside>
                <main className="main-content">
                    <h2 className="section-title">Staff Information</h2>
                    {error && <p className="error-message">{error}</p>}
                    {staff ? (
                        <div className="staff-details">
                            <h2 className="staff-name">{staff.name}</h2>
                            <div className="staff-info-section">
                                <div className="staff-info-item">
                                    <label>Username:</label>
                                    <div className="info-block">{staff.username}</div>
                                </div>
                                <div className="staff-info-item">
                                    <label>Email:</label>
                                    <div className="info-block">{staff.email}</div>
                                </div>
                                <div className="staff-info-item">
                                    <label>Role:</label>
                                    <div className="info-block">{staff.role}</div>
                                </div>
                                <div className="staff-info-item">
                                    <label>Date Joined:</label>
                                    <div className="info-block">{new Date(staff.updatedAt).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="loading-message">Loading staff details...</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default StaffPage;
