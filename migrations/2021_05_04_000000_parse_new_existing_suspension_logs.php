<?php
use Illuminate\Database\Schema\Builder;
use Flarum\Formatter\Formatter;
use Flarum\Post\Post;

return [
    'up' => function (Builder $schema) {
        /** @var Formatter $formatter */
        $formatter = app()->make(Formatter::class);

        $schema->getConnection()
            ->query()
            ->select()
            ->from('users_suspension_history')
            ->chunk(100, function ($suspensionLogs) use ($formatter, $schema) {
                foreach ($suspensionLogs as $suspensionLog) {
                    $update = [];
                    if ($suspensionLog->reason !== null && substr( $suspensionLog->reason, 0, 1 ) !== "<") {
                        $update['reason'] = $formatter->parse($suspensionLog->reason, new Post());
                    }
                    if ($suspensionLog->message !== null && substr( $suspensionLog->message, 0, 1 ) !== "<") {
                        $update['message'] = $formatter->parse($suspensionLog->message, new Post());
                    }

                    if (array_key_exists('message', $update) || array_key_exists('reason', $update)) {
                        $schema->getConnection()->table('users_suspension_history')
                            ->where('id', $suspensionLog->id)
                            ->update($update);
                    }
                }
            });
    },

    'down' => function (Builder $schema) {
        // One way
    }
];
