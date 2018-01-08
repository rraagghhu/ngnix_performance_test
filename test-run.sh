c=( 100 200 500 1000 1500 2000 )
n=( 10000 30000 50000 100000 )

#c=( 100 )
#n=( 1000 2000 )


name_of_the_file=$1
rm "$name_of_the_file" "js_$name_of_the_file"

for i in "${c[@]}"
do
	for j in "${n[@]}"
	do
		cmd="ab -r -s60 -k -l -c$i -n$j https://hindi-devo.ptlp.co/app/test"
		echo $cmd
		echo "START_COMMAND::$cmd::END_COMMAND" >> "$name_of_the_file"
		echo "$($cmd)" >> "$name_of_the_file"
		echo "END_RESULT" >> "$name_of_the_file"
	done
done

# nodejs
node process.js $name_of_the_file

