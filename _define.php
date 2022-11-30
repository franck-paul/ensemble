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
if (!defined('DC_RC_PATH')) {
    return;
}

$this->registerModule(
    'Ensemble',
    'Experimental theme',
    'Franck Paul',
    '2.0',
    [
        'type'   => 'theme',
        'tplset' => 'dotty',

        'details'    => 'https://open-time.net/?q=ensemble',
        'support'    => 'https://github.com/franck-paul/ensemble',
        'repository' => 'https://raw.githubusercontent.com/franck-paul/ensemble/master/dcstore.xml',
    ]
);
