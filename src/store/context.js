import React from 'react';
import SystemMess from 'dizzyl-util/lib/system/systemMess';

const isPhone = new SystemMess().isPhone;

export const isPhoneContext = React.createContext(isPhone);