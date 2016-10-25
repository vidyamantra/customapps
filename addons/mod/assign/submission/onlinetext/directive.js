// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.mod_assign')

/**
 * Directive to render assign submission onlinetext.
 *
 * @module mm.addons.mod_assign
 * @ngdoc directive
 * @name mmaModAssignSubmissionOnlinetext
 */
.directive('mmaModAssignSubmissionOnlinetext', function($mmaModAssign, $mmText) {

    // Convenience function to count words of the text.
    function wordcount(text) {
        text = text.replace(/<\/?(?!\!)[^>]*>/gi, '');
        // Replace underscores (which are classed as word characters) with spaces.
        text = text.replace(/_/gi, " ");
        // Remove any characters that shouldn't be treated as word boundaries.
        text = text.replace(/[\'"’-]/gi, "");
        // Remove dots and commas from within numbers only.
        text = text.replace(/([0-9])[.,]([0-9])/gi, '$1$2');

        return text.split(/\w\b/gi).length - 1;
    }

    return {
        restrict: 'A',
        priority: 100,
        templateUrl: 'addons/mod/assign/submission/onlinetext/template.html',
        link: function(scope, element) {
            if (!scope.plugin) {
                return;
            }
            scope.text = $mmaModAssign.getSubmissionPluginText(scope.plugin);

            angular.element(element).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (scope.text && scope.text != "") {
                    // Open a new state with the interpolated contents.
                    $mmText.expandText(scope.plugin.name, scope.text);
                }
            });

            if (scope.configs.wordlimitenabled) {
                scope.words = wordcount(scope.text);
            }
        }
    };
});
