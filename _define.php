<?php
# -- BEGIN LICENSE BLOCK ---------------------------------------
# This file is part of Ensemble, a theme for Dotclear
#
# Copyright (c) Association Dotclear
# Licensed under the GPL version 2.0 license.
# See LICENSE file or
# http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
#
# -- END LICENSE BLOCK -----------------------------------------
if (!defined('DC_RC_PATH')) {
    return;
}

$this->registerModule(
    'Ensemble',					// Name
    'Experimental theme',	    // Description
    'Franck Paul',				// Authors
    '1.0',						// Version
    [							// Properties
        'type'   => 'theme',
        'tplset' => 'dotty',

        'details'    => 'https://open-time.net/?q=ensemble',       // Details URL
        'support'    => 'https://github.com/franck-paul/ensemble', // Support URL
        'repository' => 'https://raw.githubusercontent.com/franck-paul/ensemble/master/dcstore.xml'
    ]
);
