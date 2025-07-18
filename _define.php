<?php

/**
 * @brief Ensemble, a theme for Dotclear 2
 *
 * @package Dotclear
 * @subpackage Themes
 *
 * @copyright Franck Paul (carnet.franck.paul@gmail.com)
 * @copyright GPL-2.0
 */
$this->registerModule(
    'Ensemble',
    'Experimental theme',
    'Franck Paul',
    '4.1',
    [
        'date'     => '2003-08-13T13:42:00+0100',
        'requires' => [['core', '2.28']],
        'type'     => 'theme',
        'tplset'   => 'dotty',

        'details'    => 'https://open-time.net/?q=ensemble',
        'support'    => 'https://github.com/franck-paul/ensemble',
        'repository' => 'https://raw.githubusercontent.com/franck-paul/ensemble/main/dcstore.xml',
        'license'    => 'gpl2',
    ]
);
