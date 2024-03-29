import { AnyAction } from 'redux';
import { FieldValuesRegister } from '../../../../../types/FieldValues';
import { User } from '../../types';

export type RegisterActionTypes = {
  REGISTER_REQUEST: string;
  REGISTER_FAILED: string;
};

export type RegisterActionCreators = {
  registerRequest(data: FieldValuesRegister): AnyAction;
  registerFailed(): AnyAction;
};
