import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    companyName: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setFormData({
      name: userToEdit.name,
      username: userToEdit.username,
      email: userToEdit.email,
      phone: userToEdit.phone,
      website: userToEdit.website,
      street: userToEdit.address.street,
      suite: userToEdit.address.suite,
      city: userToEdit.address.city,
      zipcode: userToEdit.address.zipcode,
      companyName: userToEdit.company.name
    });
    setEditingId(id);
  };

  const handleUpdate = async () => {
    try {
      const updatedUsers = users.map(user => {
        if (user.id === editingId) {
          return {
            ...user,
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            website: formData.website,
            address: {
              ...user.address,
              street: formData.street,
              suite: formData.suite,
              city: formData.city,
              zipcode: formData.zipcode
            },
            company: {
              ...user.company,
              name: formData.companyName
            }
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      setEditingId(null);
      setFormData({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        companyName: ''
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleAdd = () => {
    const newUser = {
      id: users.length + 1,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode
      },
      company: {
        name: formData.companyName
      }
    };
    setUsers([...users, newUser]);
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      companyName: ''
    });
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">User List</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Add New User</h2>
          <input type="text" className="form-control mb-2" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
          <input type="text" className="form-control mb-2" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" />
          <input type="text" className="form-control mb-2" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
          <input type="text" className="form-control mb-2" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" />
          <input type="text" className="form-control mb-2" name="website" value={formData.website} onChange={handleInputChange} placeholder="Website" />
          <input type="text" className="form-control mb-2" name="street" value={formData.street} onChange={handleInputChange} placeholder="Street" />
          <input type="text" className="form-control mb-2" name="suite" value={formData.suite} onChange={handleInputChange} placeholder="Suite" />
          <input type="text" className="form-control mb-2" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
          <input type="text" className="form-control mb-2" name="zipcode" value={formData.zipcode} onChange={handleInputChange} placeholder="Zipcode" />
          <input type="text" className="form-control mb-2" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" />
          <button className="btn btn-success mr-2" onClick={handleAdd}>Add</button>
        </div>
      </div>
      
      <div className="row mt-3 justify-content-center">
        {users.map(user => (
          <div className="col-md-4 mb-4 " key={user.id}>
            <div className="card">
              <div className="card-body">
                {editingId === user.id ? (
                  <>
                    <input type="text" className="form-control mb-2" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
                    <input type="text" className="form-control mb-2" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" />
                    <input type="text" className="form-control mb-2" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                    <input type="text" className="form-control mb-2" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" />
                    <input type="text" className="form-control mb-2" name="website" value={formData.website} onChange={handleInputChange} placeholder="Website" />
                    <input type="text" className="form-control mb-2" name="street" value={formData.street} onChange={handleInputChange} placeholder="Street" />
                    <input type="text" className="form-control mb-2" name="suite" value={formData.suite} onChange={handleInputChange} placeholder="Suite" />
                    <input type="text" className="form-control mb-2" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                    <input type="text" className="form-control mb-2" name="zipcode" value={formData.zipcode} onChange={handleInputChange} placeholder="Zipcode" />
                    <input type="text" className="form-control mb-2" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" />
                    <button className="btn btn-primary mb-2" onClick={handleUpdate}>Update</button>
                    <button className="btn btn-secondary mb-2" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text"><strong>Username:</strong> {user.username}</p>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                    <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
                    <p className="card-text"><strong>Website:</strong> {user.website}</p>
                    <p className="card-text"><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
                    <p className="card-text"><strong>Company:</strong> {user.company.name}</p>
                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(user.id)}>Edit</button>
                    <button className="btn btn-danger ml-2" onClick={() => handleDelete(user.id)}>Delete</button>
      
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
