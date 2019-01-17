import React from 'react';
import SystemMess from 'dizzyl-util/lib/system/systemMess';
import io from 'socket.io-client';

const isPhone = new SystemMess().isPhone;
export const isPhoneContext = React.createContext(isPhone);

const socket = io();
export const socketContext = React.createContext(socket);


