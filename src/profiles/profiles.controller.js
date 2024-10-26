import { ManagementClient } from 'auth0';

import * as ProfilesService from './profiles.service.js';

const removeProfile = async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    // const data = await ProfilesService.removeProfile(userId);

    // console.log(process.env.AUTH0_DOMAIN)
    // console.log(process.env.AUTH0_CLIENT_ID)
    // console.log(process.env.AUTH0_CLIENT_SECRET)

    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(new URLSearchParams({
    //     grant_type: 'client_credentials',
    //     client_id: process.env.AUTH0_CLIENT_ID,
    //     client_secret: process.env.AUTH0_CLIENT_SECRET,
    //     audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
    //   }))
    // };

    // const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, options);
    // const result = await response.json();

    // console.log(result);

    // const management = new ManagementClient({
    //   domain: process.env.AUTH0_DOMAIN,
    //   clientId: process.env.AUTH0_MACHINE_TO_MACHINE_CLIENT_ID,
    //   clientSecret: process.env.AUTH0_MACHINE_TO_MACHINE_CLIENT_SECRET,
    // });

    // await management.users.delete({ id: userId }, (error) => {
    //   if (error) console.log(error);
    // });

    res.status(200).json({ data: '' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addProfile = async (req, res) => {
  try {
    const {
      userId,
    } = req.body;
    const data = await ProfilesService.addProfile(userId);
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const notFound = (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
}

export {
  removeProfile,
  addProfile,
  notFound,
};
