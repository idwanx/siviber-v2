<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StatusBerkasEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */

    // public $instansiId;
    // public $newData;

    public function __construct(public $instansiId, public $newData)
    {
        // $this->instansiId = $instansiId;
        // $this->newData = $newData;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('instansi.'.$this->instansiId),
            new PrivateChannel('admin-verifikator'),
            // new PrivateChannel('instansi.'.$this->newData['instansi_id']),
        ];
    }
}
