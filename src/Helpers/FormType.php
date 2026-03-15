<?php

namespace GT264\CrudFiesta\Helpers;

class FormType
{
    public const string TEXT = 'InputText';
    public const string TEXTAREA = 'InputTextarea';
    public const string NUMBER = 'InputNumber';
    public const string CALENDAR = 'Calendar';
    public const string CHECKBOX = 'Checkbox';
    public const string DROPDOWN = 'Dropdown';
    public const string MULTI_SELECT = 'MultiSelect';
    public const string PASSWORD = 'Password';
    public const string RATING = 'Rating';
    public const string MASK = 'InputMask';
    public const string EDITOR = 'Editor';
    public const string IMAGE = 'Image';
    public const string FILE = 'File';
    public const string EMAIL = 'email'; // Special case handled in Form.jsx default
}
