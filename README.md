# ii1302-Project

In this repository we will have both the mobile application and the Raspberry Pi code under respective folder.

## FSS-APP

This folder is the mobile app. Do not edit unless you work with mobile app.

**_ To Run the Mobile App _**

We assume you have Node.js installed on your OS, if not download here https://nodejs.org/en/download
Choose version v20.12.2 (LTS)

1. Clone the repository https://github.com/ziamohseni/ii1302-Project.git
2. After cloning, change your directory to "fss-app". `cd fss-app`
3. Run `npm install`.
4. In the mean time download the "Expo Go" app from Apple Store or Google Play
5. Then run `npx expo start`, after server has started, scan the QR code to open the app.

### Technologies used in developing the mobile app

1. React Native Expo (https://docs.expo.dev/)
2. Firebase Realtime Database, Authentication, Cloud Messaging
3. JavaScript language

### Database data structure for project

```yaml
users:
  user_id_1: # user_id is "user uid" from the authentication
    first_name: "John"
    last_name: "Doe"
    hubs_owned: ["hub_id_1", "hub_id_2"] # admin can own multiple hubs. * Empty intially. we don't use "null".
    hubs_accessible: ["hub_id_1", "hub_id_2"] # admin has access to all owned hubs

  user_id_2:
    first_name: "Jane"
    last_name: "Smith"
    hubs_owned: "null"
    hubs_accessible: ["hub_id_1"] # sub-user has access to specific hubs

  user_id_3:
    first_name: "Alice"
    last_name: "Johnson"
    hubs_owned: "null"
    hubs_accessible: ["hub_id_1", "hub_id_2"] # sub-user has access to specific hubs

raspberry_hubs:
  hub_id_1:
    admin: "user_id_1" # direct reference to the user who owns this hub
    users:
      user_id_2:
        access_sensors: ["sensor_id_1"] # we don't use this for now, it is too complicated on app development.
      user_id_3:
        access_sensors: ["sensor_id_1", "sensor_id_2"]
    sensors:
      sensor_id_1:
        id: "sensor_id_1"
        type: "motion"
        status: "active"
        triggered: "false"
        last_active: "timestamp"
      sensor_id_2:
        id: "sensor_id_2"
        type: "window"
        status: "inactive"
        triggered: "false"
        last_active: "timestamp"
      sensor_id_3:
        id: "sensor_id_3"
        type: "camera"
        status: "active"
        triggered: "false"
        recent_snapshot:
          url: "url" # URL to storage object (a picture taken when camera is activated by a sensor)
          date_taken: "timestamp" # The date the snapshot was taken
        snapshot_history:
          - url: "url" # URL to storage object (a picture taken when camera is activated by a sensor)
            date_taken: "timestamp"
          - url: "url"
            date_taken: "timestamp"
    system_status: "armed" # or unarmed (activated / deactivated)
    last_armed: "timestamp"
```

Notes:

When “system_status” is “armed” we both Raspberry Pi and Mobile app listening to sensors “status”, if some status changes, we take appropriate actions in respective devices.
