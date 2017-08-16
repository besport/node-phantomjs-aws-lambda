#!/bin/bash

. .env

command=$AWS_INVOKE

POOL_SIZE=$(mktemp)
echo '0' > $POOL_SIZE

function cleanup {
	rm -f $POOL_SIZE
	echo
	kill -- -$$
}

trap 'cleanup; exit' SIGINT

function modify_pool_size {
	read pool_size < $POOL_SIZE
	let pool_size=$pool_size+$1
	echo "$pool_size" > $POOL_SIZE
	pool_size=$(( $pool_size > 0 ? $pool_size : 0 ))
	echo "$pool_size" > $POOL_SIZE
}

function handle_keypresses {
	while ( true ); do
		read -s -N 1 key
    case "$key" in
			A) modify_pool_size +1;; # arrow up
			B) modify_pool_size -1 ;; # arrow down
			'+') modify_pool_size +10;;
			'-') modify_pool_size -10;;
    esac
	done
}

function run_jobs {
	while true; do
			current_jobs=$(jobs -pr)
			num_running_jobs=0
			for job in $current_jobs; do
					(( num_running_jobs++ ))
			done;

			read pool_size < $POOL_SIZE

			echo -en "\r\033[Krunning jobs: $num_running_jobs / $pool_size"

			jobs_to_launch=$(($pool_size - $num_running_jobs))

			for (( i = 0; i < $jobs_to_launch; i++ )); do
			    $command > /dev/null 2> /dev/null &
			done

			sleep 0.2
	done
}

run_jobs &
handle_keypresses
